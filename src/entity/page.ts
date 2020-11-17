/**
 * 分页
 */
export class Page<T> {
  constructor(
    public counts: number,
    public page: number,
    public items: T[],
    public pages: number,
    public pagesize: number
  ) {}
}
