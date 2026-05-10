import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;
  public type SessionToken = Common.SessionToken;

  public type CheckInRecord = {
    sessionId : Nat;
    studentId : UserId;
    checkedInAt : Timestamp;
  };

  public type AttendanceSummary = {
    sessionId : Nat;
    presentCount : Nat;
    absentCount : Nat;
    totalEnrolled : Nat;
  };

  public type CheckInResult = {
    #ok : CheckInRecord;
    #err : Text;
  };
};
