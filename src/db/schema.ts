import { pgTable, text, timestamp, uuid, varchar, boolean, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'student', 'consultant']);
export const applicationStatusEnum = pgEnum('application_status', [
  'draft', 'submitted', 'reviewing', 'offer_received', 'enrolled', 'rejected', 'withdrawn'
]);
export const leadStatusEnum = pgEnum('lead_status', ['new', 'contacted', 'qualified', 'converted', 'lost']);

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password'),
  role: userRoleEnum('role').default('student').notNull(),
  phone: varchar('phone', { length: 20 }),
  country: varchar('country', { length: 100 }),
  avatar: text('avatar'),
  emailVerified: timestamp('email_verified'),
  isActive: boolean('is_active').default(true),
  onboardingComplete: boolean('onboarding_complete').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Student Profiles
export const studentProfiles = pgTable('student_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  dateOfBirth: varchar('date_of_birth', { length: 20 }),
  nationality: varchar('nationality', { length: 100 }),
  passportNumber: varchar('passport_number', { length: 50 }),
  highestEducation: varchar('highest_education', { length: 100 }),
  gpa: varchar('gpa', { length: 10 }),
  englishProficiency: varchar('english_proficiency', { length: 50 }),
  preferredCountry: varchar('preferred_country', { length: 100 }),
  preferredCourse: varchar('preferred_course', { length: 100 }),
  budget: varchar('budget', { length: 50 }),
  intake: varchar('intake', { length: 50 }),
  notes: text('notes'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Applications
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  universityName: varchar('university_name', { length: 255 }).notNull(),
  universityCountry: varchar('university_country', { length: 100 }).notNull(),
  courseName: varchar('course_name', { length: 255 }).notNull(),
  level: varchar('level', { length: 50 }),
  intake: varchar('intake', { length: 50 }),
  status: applicationStatusEnum('status').default('draft').notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id),
  documents: jsonb('documents').default([]),
  notes: text('notes'),
  adminNotes: text('admin_notes'),
  offerLetterUrl: text('offer_letter_url'),
  deadline: timestamp('deadline'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Leads / Contact Inquiries
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  country: varchar('country', { length: 100 }),
  interestedIn: varchar('interested_in', { length: 255 }),
  message: text('message'),
  source: varchar('source', { length: 50 }).default('website'),
  status: leadStatusEnum('status').default('new'),
  assignedTo: uuid('assigned_to').references(() => users.id),
  convertedUserId: uuid('converted_user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Blog Posts
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => users.id),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  coverImage: text('cover_image'),
  tags: jsonb('tags').default([]),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message'),
  type: varchar('type', { length: 50 }).default('info'),
  read: boolean('read').default(false),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Testimonials
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentName: varchar('student_name', { length: 255 }).notNull(),
  studentPhoto: text('student_photo'),
  university: varchar('university', { length: 255 }),
  country: varchar('country', { length: 100 }),
  course: varchar('course', { length: 255 }),
  content: text('content').notNull(),
  rating: integer('rating').default(5),
  featured: boolean('featured').default(false),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
