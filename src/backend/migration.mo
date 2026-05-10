import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import AuthTypes "types/auth";

module {
  // ── Old types (copied from .old/src/backend/types/) ──────────────────────
  type OldUserId = Text;
  type OldSessionToken = Text;

  type OldRole = {
    #Lecturer;
    #Student;
  };

  type OldUser = {
    id : OldUserId;
    var passwordHash : Text;
    role : OldRole;
    displayName : Text;
  };

  type OldSessionStatus = { #Scheduled; #Active; #Ended };

  type OldSession = {
    id : Nat;
    lecturerId : OldUserId;
    courseName : Text;
    location : Text;
    scheduledAt : Int;
    token : OldSessionToken;
    var status : OldSessionStatus;
    var startedAt : ?Int;
    var endedAt : ?Int;
  };

  type OldCheckInRecord = {
    sessionId : Nat;
    studentId : OldUserId;
    checkedInAt : Int;
  };

  // ── Old and New actor shapes ──────────────────────────────────────────────
  type OldActor = {
    users : Map.Map<OldUserId, OldUser>;
    sessions : List.List<OldSession>;
    tokenIndex : Map.Map<OldSessionToken, Nat>;
    checkIns : List.List<OldCheckInRecord>;
    attendeeSets : Map.Map<Nat, Set.Set<OldUserId>>;
    var nextSessionId : Nat;
  };

  type NewActor = {
    users : Map.Map<AuthTypes.UserId, AuthTypes.User>;
    seeded : { var done : Bool };
  };

  // ── Migration function ────────────────────────────────────────────────────
  public func run(old : OldActor) : NewActor {
    // Migrate users: old role mapping — Lecturer→Admin, Student→Member.
    // Also converts var passwordHash → immutable passwordHash.
    let users = old.users.map<OldUserId, OldUser, AuthTypes.User>(
      func(_, u) {
        let newRole : AuthTypes.Role = switch (u.role) {
          case (#Lecturer) #Admin;
          case (#Student) #Member;
        };
        {
          id = u.id;
          passwordHash = u.passwordHash;
          displayName = u.displayName;
          role = newRole;
        };
      }
    );
    // Discard sessions, tokenIndex, checkIns, attendeeSets, nextSessionId
    // by not including them in the output.
    // Mark seeded = true so we don't re-run seed logic after upgrade.
    { users; seeded = { var done = true } };
  };
};
