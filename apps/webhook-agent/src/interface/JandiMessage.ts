export interface JandiConnectInfo {
  title: string;
  description: string;
}

export interface JandiMessage {
  body: string;
  connectColor: string;
  connectInfo: JandiConnectInfo[];
}
