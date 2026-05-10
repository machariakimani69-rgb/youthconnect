import ContribTypes "../types/contributions";
import ContribLib "../lib/contributions";
import AuthLib "../lib/auth";
import Runtime "mo:core/Runtime";

mixin (
  claims : ContribLib.ClaimList,
  claimCounter : ContribLib.Counter,
  users : AuthLib.UserMap,
) {

  /// Member: submit a contribution claim.
  public shared func submitClaim(
    callerId : Text,
    amount : Nat,
    notes : ?Text,
  ) : async ContribTypes.ClaimId {
    // Any logged-in member can submit; verify they exist
    switch (AuthLib.getRole(users, callerId)) {
      case null { Runtime.trap("Unknown user") };
      case _ {};
    };
    ContribLib.submit(claims, claimCounter, callerId, amount, notes)
  };

  /// Admin-only: approve a pending claim.
  public shared func approveClaim(
    callerId : Text,
    id : ContribTypes.ClaimId,
  ) : async Bool {
    AuthLib.requireAdmin(users, callerId);
    ContribLib.approve(claims, id)
  };

  /// Admin-only: reject a pending claim.
  public shared func rejectClaim(
    callerId : Text,
    id : ContribTypes.ClaimId,
  ) : async Bool {
    AuthLib.requireAdmin(users, callerId);
    ContribLib.reject(claims, id)
  };

  /// Member: view own claim history.
  public query func getMyClaims(callerId : Text) : async [ContribTypes.Claim] {
    ContribLib.getByMember(claims, callerId)
  };

  /// Admin: view all pending claims.
  public query func getPendingClaims(callerId : Text) : async [ContribTypes.Claim] {
    AuthLib.requireAdmin(users, callerId);
    ContribLib.getPending(claims)
  };

  /// Admin: view all claims (pending and historical).
  public query func listAllClaims(callerId : Text) : async [ContribTypes.Claim] {
    AuthLib.requireAdmin(users, callerId);
    claims.toArray()
  };

  /// Member: get own approved contribution stats.
  public query func getMyStats(callerId : Text) : async ContribTypes.MemberStats {
    ContribLib.getMemberStats(claims, callerId)
  };
};
