export function getInitials(firstName, lastName) {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  return "";
}
