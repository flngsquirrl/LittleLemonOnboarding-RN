export function getInitials(firstName, lastName) {
  const fistNamePart = firstName ? firstName[0] : '';
  const lastNamePart = lastName ? lastName[0] : '';
  return `${fistNamePart}${lastNamePart}`.toUpperCase();
}
