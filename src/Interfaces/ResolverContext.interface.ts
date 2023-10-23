import User from "./User.interface";

interface ResolverContext {
  loggedInUser: User;
}

export default ResolverContext;
