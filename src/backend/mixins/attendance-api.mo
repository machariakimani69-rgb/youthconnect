import AttendanceTypes "../types/attendance";
import AttendanceLib "../lib/attendance";
import SessionLib "../lib/session";
import AuthLib "../lib/auth";
import Runtime "mo:core/Runtime";

mixin (
  checkIns : AttendanceLib.CheckInList,
  attendeeSets : AttendanceLib.SessionAttendeeSet,
  sessions : SessionLib.SessionList,
  tokenIndex : SessionLib.SessionMap,
  users : AuthLib.UserMap,
) {
  // Student: check in to a session using the session token from QR code
  public shared ({ caller }) func checkIn(studentId : AttendanceTypes.UserId, token : AttendanceTypes.SessionToken) : async AttendanceTypes.CheckInResult {
    let callerId = caller.toText();
    // Verify caller is a registered student
    switch (AuthLib.getUser(users, callerId)) {
      case null return #err("Not registered");
      case (?info) {
        switch (info.role) {
          case (#Student) {};
          case (_) return #err("Only students can check in");
        };
      };
    };
    // Resolve session from token
    switch (SessionLib.getSessionByToken(sessions, tokenIndex, token)) {
      case null #err("Invalid session token");
      case (?session) {
        AttendanceLib.checkIn(checkIns, attendeeSets, session, callerId);
      };
    };
  };

  // Lecturer: get real-time list of attendees for a session
  public query func getSessionAttendees(sessionId : Nat) : async [AttendanceTypes.CheckInRecord] {
    AttendanceLib.getSessionAttendees(checkIns, sessionId);
  };

  // Student: get personal attendance history
  public query func getStudentAttendanceHistory(studentId : AttendanceTypes.UserId) : async [AttendanceTypes.CheckInRecord] {
    AttendanceLib.getStudentHistory(checkIns, studentId);
  };

  // Lecturer: get present/absent summary for a session
  public query func getAttendanceSummary(sessionId : Nat) : async AttendanceTypes.AttendanceSummary {
    AttendanceLib.getAttendanceSummary(attendeeSets, sessionId);
  };
};
