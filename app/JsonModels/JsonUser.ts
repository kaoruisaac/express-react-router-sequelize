import JsonModel from "./JsonModel"

class JsonUser extends JsonModel {
  declare hashId: string;
  declare name: string;
  declare email: string;

  constructor() {
    super();
  }
}
export default JsonUser;
