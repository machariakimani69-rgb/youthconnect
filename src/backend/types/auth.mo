import Common "common";

module {
  public type UserId = Common.UserId;

  public type Role = {
    #Admin;
    #Member;
  };

  public type User = {
    id : UserId;
    passwordHash : Text;
    displayName : Text;
    role : Role;
  };

  public type LoginResult = {
    #Ok : { userId : UserId; role : Role; displayName : Text };
    #InvalidCredentials;
  };
};
