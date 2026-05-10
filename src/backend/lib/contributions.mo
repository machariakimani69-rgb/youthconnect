import ContribTypes "../types/contributions";
import CommonTypes "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type ClaimList = List.List<ContribTypes.Claim>;
  public type Counter = { var next : Nat };

  /// Submit a new contribution claim from a member.
  public func submit(
    claims : ClaimList,
    counter : Counter,
    memberId : CommonTypes.UserId,
    amount : Nat,
    notes : ?Text,
  ) : ContribTypes.ClaimId {
    let id = counter.next;
    counter.next += 1;
    let claim : ContribTypes.Claim = {
      id;
      memberId;
      amount;
      notes;
      status = #Pending;
      createdAt = Time.now();
    };
    claims.add(claim);
    id
  };

  /// Approve a pending claim. Returns false if not found or not Pending.
  public func approve(claims : ClaimList, id : ContribTypes.ClaimId) : Bool {
    var found = false;
    claims.mapInPlace(
      func(c) {
        if (c.id == id and c.status == #Pending) {
          found := true;
          { c with status = #Approved }
        } else { c };
      }
    );
    found
  };

  /// Reject a pending claim. Returns false if not found or not Pending.
  public func reject(claims : ClaimList, id : ContribTypes.ClaimId) : Bool {
    var found = false;
    claims.mapInPlace(
      func(c) {
        if (c.id == id and c.status == #Pending) {
          found := true;
          { c with status = #Rejected }
        } else { c };
      }
    );
    found
  };

  /// Return all claims for a specific member.
  public func getByMember(
    claims : ClaimList,
    memberId : CommonTypes.UserId,
  ) : [ContribTypes.Claim] {
    claims.filter(func(c) { c.memberId == memberId }).toArray()
  };

  /// Return all claims with Pending status.
  public func getPending(claims : ClaimList) : [ContribTypes.Claim] {
    claims.filter(func(c) { c.status == #Pending }).toArray()
  };

  /// Compute approved contribution totals for a member.
  public func getMemberStats(
    claims : ClaimList,
    memberId : CommonTypes.UserId,
  ) : ContribTypes.MemberStats {
    claims.foldLeft<ContribTypes.MemberStats, ContribTypes.Claim>(
      { totalApprovedAmount = 0; approvedCount = 0 },
      func(acc, c) {
        if (c.memberId == memberId and c.status == #Approved) {
          {
            totalApprovedAmount = acc.totalApprovedAmount + c.amount;
            approvedCount = acc.approvedCount + 1;
          }
        } else { acc };
      },
    )
  };
};
