import Common "common";

module {
  public type ClaimId = Common.ClaimId;
  public type Timestamp = Common.Timestamp;

  public type ClaimStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  public type Claim = {
    id : ClaimId;
    memberId : Common.UserId;
    amount : Nat;
    notes : ?Text;
    status : ClaimStatus;
    createdAt : Timestamp;
  };

  public type MemberStats = {
    totalApprovedAmount : Nat;
    approvedCount : Nat;
  };
};
