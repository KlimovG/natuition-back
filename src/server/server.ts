export default class Server {
  public static async bootstrap(): Promise<Server> {
    return new Server();
  }
}
