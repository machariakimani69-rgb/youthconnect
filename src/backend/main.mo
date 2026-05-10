import AuthLib "lib/auth";
import AnnouncementsLib "lib/announcements";
import ContribLib "lib/contributions";
import AuthMixin "mixins/auth-api";
import AnnouncementsMixin "mixins/announcements-api";
import ContribMixin "mixins/contributions-api";
import Map "mo:core/Map";
import List "mo:core/List";
import AuthTypes "types/auth";

import Migration "migration";

(with migration = Migration.run)
actor {
  // --- Auth state ---
  let users : AuthLib.UserMap = Map.empty<AuthTypes.UserId, AuthTypes.User>();

  // --- Announcements state ---
  let announcements : AnnouncementsLib.AnnouncementList = List.empty();
  let announcementCounter : AnnouncementsLib.Counter = { var next = 0 };

  // --- Contributions state ---
  let claims : ContribLib.ClaimList = List.empty();
  let claimCounter : ContribLib.Counter = { var next = 0 };

  // --- Seed flag (prevents re-seeding on upgrades) ---
  let seeded : { var done : Bool } = { var done = false };

  // --- Seed data (runs once on fresh install) ---
  if (not seeded.done) {
    seeded.done := true;

    // Seed users
    ignore AuthLib.register(users, "admin", "church123", "Church Admin", #Admin);
    ignore AuthLib.register(users, "youth1", "youth123", "Grace Mwangi", #Member);
    ignore AuthLib.register(users, "youth2", "youth123", "David Osei", #Member);

    // Seed announcements (use a fixed past timestamp for determinism)
    let t0 : Int = 1_700_000_000_000_000_000;
    announcements.add({ id = 0; title = "Welcome to Youth Connect!"; body = "Welcome to our church youth portal. Here you can track your contributions, stay updated on announcements, and see how our group is growing together."; createdAt = t0; authorId = "admin" });
    announcements.add({ id = 1; title = "Monthly Offering – May 2026"; body = "Our May monthly offering target is KES 50,000. Submit your contribution claims through the portal so your amount is recorded. God bless your giving!"; createdAt = t0 + 86_400_000_000_000; authorId = "admin" });
    announcements.add({ id = 2; title = "Youth Service – Sunday 18 May"; body = "Youth-led service this Sunday at 10 AM. All youth members are encouraged to attend. There will be a brief rehearsal on Saturday at 4 PM."; createdAt = t0 + 2 * 86_400_000_000_000; authorId = "admin" });
    announcementCounter.next := 3;

    // Seed claims
    claims.add({ id = 0; memberId = "youth1"; amount = 500; notes = ?"Weekly tithe"; status = #Approved; createdAt = t0 });
    claims.add({ id = 1; memberId = "youth2"; amount = 1000; notes = ?"Monthly contribution"; status = #Approved; createdAt = t0 + 86_400_000_000_000 });
    claims.add({ id = 2; memberId = "youth1"; amount = 750; notes = ?"Special offering"; status = #Pending; createdAt = t0 + 2 * 86_400_000_000_000 });
    claims.add({ id = 3; memberId = "youth2"; amount = 300; notes = null; status = #Rejected; createdAt = t0 + 3 * 86_400_000_000_000 });
    claimCounter.next := 4;
  };

  // --- Mixins ---
  include AuthMixin(users);
  include AnnouncementsMixin(announcements, announcementCounter, users);
  include ContribMixin(claims, claimCounter, users);
};
