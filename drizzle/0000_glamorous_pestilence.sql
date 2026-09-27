CREATE TABLE `swaps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`have` text NOT NULL,
	`want` text NOT NULL,
	`claimed_by` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
