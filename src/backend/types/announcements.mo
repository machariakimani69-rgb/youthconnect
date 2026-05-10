import Common "common";

module {
  public type AnnouncementId = Common.AnnouncementId;
  public type Timestamp = Common.Timestamp;

  public type Announcement = {
    id : AnnouncementId;
    title : Text;
    body : Text;
    createdAt : Timestamp;
    authorId : Common.UserId;
  };
};
