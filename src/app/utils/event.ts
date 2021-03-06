
import { paths, resolvePath } from "app/paths";

export const bindTypes = (type) => {
  switch (type.toString()) {
    case '1':
      return 'upcoming';
    case '2':
      return 'past';
    default:
      return null;
  }
};

export const getEventLink = (event) => {
  const type = bindTypes(event.type);
  return resolvePath(paths.eventDetails, event.id, type);
};
