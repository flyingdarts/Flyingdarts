
export enum WebSocketActions {
  Connect = "connect$",
  Disconnect = "disconnect$",
  Default = "default$",
  RoomsOnCreate = "rooms/create",
  RoomsOnJoin = "rooms/join",
  X01OnScore = "x01/score",
  UserProfileCreate = "v2/user/profile/create",
  UserProfileGet = "v2/user/profile/get",
  X01GameCreate = "v2/games/x01/create",
  X01QueueJoin = "v2/games/x01/joinqueue"
}
