import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type SessionToken = Common.SessionToken;

  public type SessionStatus = {
    #Scheduled;
    #Active;
    #Ended;
  };

  public type Session = {
    id : Nat;
    lecturerId : UserId;
    courseName : Text;
    location : Text;
    scheduledAt : Timestamp;
    token : SessionToken;
    var status : SessionStatus;
    var startedAt : ?Timestamp;
    var endedAt : ?Timestamp;
  };

  // Shared (API boundary) - no var fields
  public type SessionInfo = {
    id : Nat;
    lecturerId : UserId;
    courseName : Text;
    location : Text;
    scheduledAt : Timestamp;
    token : SessionToken;
    status : SessionStatus;
    startedAt : ?Timestamp;
    endedAt : ?Timestamp;
  };

  public type CreateSessionArgs = {
    courseName : Text;
    location : Text;
    scheduledAt : Timestamp;
  };
};
