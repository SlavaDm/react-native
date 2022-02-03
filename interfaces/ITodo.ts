export interface ITodo {
  readonly id?: number;
  readonly isChecked?: boolean;
  readonly title?: string;
  readonly idForDocument: string;
  readonly days?: number;
  readonly addingTime: number;
}
