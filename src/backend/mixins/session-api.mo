import SessionTypes "../types/session";
import AuthLib "../lib/auth";
import SessionLib "../lib/session";
import Runtime "mo:core/Runtime";

mixin (
  sessions : SessionLib.SessionList,
  tokenIndex : SessionLib.SessionMap,
  users : AuthLib.UserMap,
) {
  var nextSessionId : Nat = 0;
  // Lecturer: create a new class session; returns created session with generated token
  public shared ({ caller }) func createSession(args : SessionTypes.CreateSessionArgs) : async SessionTypes.SessionInfo {
    let callerId = caller.toText();
    // Verify caller is a registered lecturer
    switch (AuthLib.getUser(users, callerId)) {
      case null Runtime.trap("Not registered");
      case (?info) {
        switch (info.role) {
          case (#Lecturer) {};
          case (_) Runtime.trap("Only lecturers can create sessions");
        };
      };
    };
    let info = SessionLib.createSession(sessions, tokenIndex, callerId, args, nextSessionId);
    nextSessionId += 1;
    info;
  };

  // Lecturer: start a session (make it active so students can check in)
  public shared ({ caller }) func startSession(sessionId : Nat) : async Bool {
    SessionLib.startSession(sessions, sessionId, caller.toText());
  };

  // Lecturer: end a session
  public shared ({ caller }) func endSession(sessionId : Nat) : async Bool {
    SessionLib.endSession(sessions, sessionId, caller.toText());
  };

  // Lecturer: list all sessions they created
  public query ({ caller }) func getLecturerSessions(lecturerId : SessionTypes.UserId) : async [SessionTypes.SessionInfo] {
    SessionLib.getLecturerSessions(sessions, lecturerId);
  };

  // Get session details by ID (any role)
  public query func getSession(sessionId : Nat) : async ?SessionTypes.SessionInfo {
    SessionLib.getSession(sessions, sessionId);
  };

  // Look up session by token (used when student scans QR code)
  public query func getSessionByToken(token : SessionTypes.SessionToken) : async ?SessionTypes.SessionInfo {
    SessionLib.getSessionByToken(sessions, tokenIndex, token);
  };
};
