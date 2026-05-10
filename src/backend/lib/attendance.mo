import Types "../types/attendance";
import SessionTypes "../types/session";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";

module {
  public type CheckInList = List.List<Types.CheckInRecord>;
  // Map from sessionId -> set of studentIds who checked in
  public type SessionAttendeeSet = Map.Map<Nat, Set.Set<Types.UserId>>;

  public func checkIn(
    checkIns : CheckInList,
    attendeeSets : SessionAttendeeSet,
    session : SessionTypes.SessionInfo,
    studentId : Types.UserId,
  ) : Types.CheckInResult {
    // Session must be active
    switch (session.status) {
      case (#Active) {};
      case (_) { return #err("Session is not active") };
    };

    // Check for duplicate check-in
    if (hasCheckedIn(attendeeSets, session.id, studentId)) {
      return #err("Already checked in to this session");
    };

    let record : Types.CheckInRecord = {
      sessionId = session.id;
      studentId;
      checkedInAt = Time.now();
    };
    checkIns.add(record);

    // Update attendee set for this session
    switch (attendeeSets.get(session.id)) {
      case null {
        let newSet = Set.empty<Types.UserId>();
        newSet.add(studentId);
        attendeeSets.add(session.id, newSet);
      };
      case (?existingSet) {
        existingSet.add(studentId);
      };
    };

    #ok(record);
  };

  public func getSessionAttendees(checkIns : CheckInList, sessionId : Nat) : [Types.CheckInRecord] {
    checkIns.filter(func(r : Types.CheckInRecord) : Bool { r.sessionId == sessionId })
      .toArray();
  };

  public func getStudentHistory(checkIns : CheckInList, studentId : Types.UserId) : [Types.CheckInRecord] {
    checkIns.filter(func(r : Types.CheckInRecord) : Bool { r.studentId == studentId })
      .toArray();
  };

  public func getAttendanceSummary(
    attendeeSets : SessionAttendeeSet,
    sessionId : Nat,
  ) : Types.AttendanceSummary {
    let presentCount = switch (attendeeSets.get(sessionId)) {
      case null 0;
      case (?s) s.size();
    };
    // totalEnrolled and absentCount are not tracked in this simple model
    {
      sessionId;
      presentCount;
      absentCount = 0;
      totalEnrolled = presentCount;
    };
  };

  public func hasCheckedIn(attendeeSets : SessionAttendeeSet, sessionId : Nat, studentId : Types.UserId) : Bool {
    switch (attendeeSets.get(sessionId)) {
      case null false;
      case (?s) s.contains(studentId);
    };
  };
};
