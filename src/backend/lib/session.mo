import Types "../types/session";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Nat32 "mo:core/Nat32";

module {
  public type SessionList = List.List<Types.Session>;
  public type SessionMap = Map.Map<Types.SessionToken, Nat>; // token -> session id

  public func createSession(
    sessions : SessionList,
    tokenIndex : SessionMap,
    lecturerId : Types.UserId,
    args : Types.CreateSessionArgs,
    nextId : Nat,
  ) : Types.SessionInfo {
    let token = generateToken(nextId, lecturerId, Time.now());
    let session : Types.Session = {
      id = nextId;
      lecturerId;
      courseName = args.courseName;
      location = args.location;
      scheduledAt = args.scheduledAt;
      token;
      var status = #Scheduled;
      var startedAt = null;
      var endedAt = null;
    };
    sessions.add(session);
    tokenIndex.add(token, nextId);
    toSessionInfo(session);
  };

  public func startSession(sessions : SessionList, sessionId : Nat, lecturerId : Types.UserId) : Bool {
    switch (sessions.find(func(s : Types.Session) : Bool { s.id == sessionId })) {
      case null false;
      case (?session) {
        if (session.lecturerId != lecturerId) return false;
        session.status := #Active;
        session.startedAt := ?Time.now();
        true;
      };
    };
  };

  public func endSession(sessions : SessionList, sessionId : Nat, lecturerId : Types.UserId) : Bool {
    switch (sessions.find(func(s : Types.Session) : Bool { s.id == sessionId })) {
      case null false;
      case (?session) {
        if (session.lecturerId != lecturerId) return false;
        session.status := #Ended;
        session.endedAt := ?Time.now();
        true;
      };
    };
  };

  public func getSession(sessions : SessionList, sessionId : Nat) : ?Types.SessionInfo {
    switch (sessions.find(func(s : Types.Session) : Bool { s.id == sessionId })) {
      case null null;
      case (?session) ?toSessionInfo(session);
    };
  };

  public func getSessionByToken(sessions : SessionList, tokenIndex : SessionMap, token : Types.SessionToken) : ?Types.SessionInfo {
    switch (tokenIndex.get(token)) {
      case null null;
      case (?sid) getSession(sessions, sid);
    };
  };

  public func getLecturerSessions(sessions : SessionList, lecturerId : Types.UserId) : [Types.SessionInfo] {
    sessions.filter(func(s : Types.Session) : Bool { s.lecturerId == lecturerId })
      .map<Types.Session, Types.SessionInfo>(func(s) { toSessionInfo(s) })
      .toArray();
  };

  public func generateToken(sessionId : Nat, lecturerId : Types.UserId, seed : Int) : Types.SessionToken {
    // djb2-style hash combining sessionId, lecturerId, and time seed
    var hash : Nat32 = 7919;
    for (c in sessionId.toText().toIter()) {
      hash := hash *% 31 +% Char.toNat32(c);
    };
    for (c in lecturerId.toIter()) {
      hash := hash *% 31 +% Char.toNat32(c);
    };
    // incorporate seed (Time.now() is always >= 0 on IC)
    let seedNat : Nat = if (seed >= 0) { seed.toNat() % 1_000_000 } else { 0 };
    hash := hash *% 31 +% Nat32.fromNat(seedNat % 4294967296);
    "tok-" # sessionId.toText() # "-" # hash.toText();
  };

  public func toSessionInfo(session : Types.Session) : Types.SessionInfo {
    {
      id = session.id;
      lecturerId = session.lecturerId;
      courseName = session.courseName;
      location = session.location;
      scheduledAt = session.scheduledAt;
      token = session.token;
      status = session.status;
      startedAt = session.startedAt;
      endedAt = session.endedAt;
    };
  };
};
