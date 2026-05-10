import AnnouncementTypes "../types/announcements";
import CommonTypes "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type AnnouncementList = List.List<AnnouncementTypes.Announcement>;
  public type Counter = { var next : Nat };

  /// Create a new announcement and prepend it to the list.
  public func create(
    list : AnnouncementList,
    counter : Counter,
    authorId : CommonTypes.UserId,
    title : Text,
    body : Text,
  ) : AnnouncementTypes.AnnouncementId {
    let id = counter.next;
    counter.next += 1;
    let announcement : AnnouncementTypes.Announcement = {
      id;
      title;
      body;
      createdAt = Time.now();
      authorId;
    };
    list.add(announcement);
    id
  };

  /// Return all announcements in reverse-chronological order.
  public func listAll(list : AnnouncementList) : [AnnouncementTypes.Announcement] {
    list.reverse().toArray()
  };

  /// Delete an announcement by id. Returns true if found and removed.
  public func delete(
    list : AnnouncementList,
    id : AnnouncementTypes.AnnouncementId,
  ) : Bool {
    let sizeBefore = list.size();
    let filtered = list.filter(func(a) { a.id != id });
    if (filtered.size() == sizeBefore) { return false };
    list.clear();
    list.append(filtered);
    true
  };
};
