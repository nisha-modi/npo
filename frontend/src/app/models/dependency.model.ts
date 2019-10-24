export class Dependency {
  constructor(
    public name: string,
    public version: string,
    public description: string = null,
    public dependencyScore: number = null,
    public optimal: number = null,
    public quality: number = null,
    public maintenence: number = null,
    public popularity: number = null,
    public treeScore: string = null,
    public alternatives: Dependency[] = null
  ) {}
}
