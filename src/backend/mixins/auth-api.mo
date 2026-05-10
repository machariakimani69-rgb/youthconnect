import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (users : AuthLib.UserMap) {

  /// Log in with username + password. Returns login result.
  public shared func login(
    userId : AuthTypes.UserId,
    password : Text,
  ) : async AuthTypes.LoginResult {
    AuthLib.login(users, userId, password)
  };

  /// Register a new member account (open registration for Members).
  public shared func registerMember(
    userId : AuthTypes.UserId,
    password : Text,
    displayName : Text,
  ) : async Bool {
    AuthLib.register(users, userId, password, displayName, #Member)
  };

  /// Admin-only: register any user with any role.
  public shared ({ caller }) func adminRegisterUser(
    callerId : AuthTypes.UserId,
    newUserId : AuthTypes.UserId,
    password : Text,
    displayName : Text,
    role : AuthTypes.Role,
  ) : async Bool {
    AuthLib.requireAdmin(users, callerId);
    AuthLib.register(users, newUserId, password, displayName, role)
  };

  /// Return the role of a user, or null if not found.
  public query func getRole(userId : AuthTypes.UserId) : async ?AuthTypes.Role {
    AuthLib.getRole(users, userId)
  };
};
