export class Role {
  id: number;
  title: string;
  slug: string;
  lane_assignment: string;

  constructor(object?: any) {
    for (var prop in object) {
      this[prop] = object[prop];
    }
  }
}
