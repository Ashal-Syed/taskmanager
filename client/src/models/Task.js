export default class Task {
  constructor(id, title, description, dueDate, status = 'pending') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.status = status; // 'pending' | 'done'
  }

  markAsDone() {
    this.status = 'done';
  }

  isOverdue() {
    return new Date() > this.dueDate && this.status !== 'done';
  }

  toString() {
    return `${this.title} - ${this.status}`;
  }
}
