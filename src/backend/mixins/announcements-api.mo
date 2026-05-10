import AnnouncementTypes "../types/announcements";
import AnnouncementsLib "../lib/announcements";
import AuthLib "../lib/auth";

mixin (
  announcements : AnnouncementsLib.AnnouncementList,
  announcementCounter : AnnouncementsLib.Counter,
  users : AuthLib.UserMap,
) {

  /// Admin-only: create a new announcement.
  public shared func createAnnouncement(
    callerId : Text,
    title : Text,
    body : Text,
  ) : async AnnouncementTypes.AnnouncementId {
    AuthLib.requireAdmin(users, callerId);
    AnnouncementsLib.create(announcements, announcementCounter, callerId, title, body)
  };

  /// Return all announcements in reverse-chronological order.
  public query func listAnnouncements() : async [AnnouncementTypes.Announcement] {
    AnnouncementsLib.listAll(announcements)
  };

  /// Admin-only: delete an announcement by id.
  public shared func deleteAnnouncement(
    callerId : Text,
    id : AnnouncementTypes.AnnouncementId,
  ) : async Bool {
    AuthLib.requireAdmin(users, callerId);
    AnnouncementsLib.delete(announcements, id)
  };
};
