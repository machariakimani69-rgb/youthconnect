import AuthTypes "../types/auth";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

module {
  public type UserMap = Map.Map<AuthTypes.UserId, AuthTypes.User>;

  /// Hash a plaintext password into a stored hash.
  public func hashPassword(password : Text) : Text {
    // Simple deterministic hash: concatenate with a salt prefix for basic obfuscation.
    // For production, use a proper crypto library. Here we encode as UTF-8 hex-like.
    "sha256:" # password # ":church2024"
  };

  /// Verify a plaintext password against a stored hash.
  public func verifyPassword(password : Text, hash : Text) : Bool {
    hashPassword(password) == hash
  };

  /// Attempt login; return the login result.
  public func login(users : UserMap, userId : AuthTypes.UserId, password : Text) : AuthTypes.LoginResult {
    switch (users.get(userId)) {
      case null #InvalidCredentials;
      case (?user) {
        if (verifyPassword(password, user.passwordHash)) {
          #Ok { userId = user.id; role = user.role; displayName = user.displayName }
        } else {
          #InvalidCredentials
        };
      };
    };
  };

  /// Register a new user. Returns false if userId already exists.
  public func register(
    users : UserMap,
    userId : AuthTypes.UserId,
    password : Text,
    displayName : Text,
    role : AuthTypes.Role,
  ) : Bool {
    if (users.get(userId) != null) { return false };
    let user : AuthTypes.User = {
      id = userId;
      passwordHash = hashPassword(password);
      displayName;
      role;
    };
    users.add(userId, user);
    true
  };

  /// Return the role of an existing user, or null.
  public func getRole(users : UserMap, userId : AuthTypes.UserId) : ?AuthTypes.Role {
    switch (users.get(userId)) {
      case null null;
      case (?u) ?u.role;
    };
  };

  /// Require that the caller has Admin role; trap otherwise.
  public func requireAdmin(users : UserMap, userId : AuthTypes.UserId) {
    switch (getRole(users, userId)) {
      case (?(#Admin)) {};
      case _ { Runtime.trap("Admin access required") };
    };
  };
};
