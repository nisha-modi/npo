export class Dependency {
  get treeScore(): number {
    return this.optimal / this.dependencyScore;
  }

  constructor(
    public name: string,
    public version: string,
    public description: string = null,
    public dependencyScore: number = null,
    public optimal: number = null,
    public quality: number = null,
    public maintenance: number = null,
    public popularity: number = null,
    public alternatives: Dependency[] = null
  ) {}
}
