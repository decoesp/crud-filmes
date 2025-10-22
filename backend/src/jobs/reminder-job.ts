import cron from 'node-cron';
import { prisma } from '../config/database';
import { EmailService } from '../services/email.service';

const emailService = new EmailService();

export const startCronJobs = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Running movie reminder job...');

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const movies = await prisma.movie.findMany({
        where: {
          releaseDate: {
            gte: today,
            lt: tomorrow,
          },
          reminderSent: false,
        },
        include: {
          user: true,
        },
      });

      console.log(`Found ${movies.length} movies to send reminders`);

      for (const movie of movies) {
        try {
          await emailService.sendMovieReminderEmail(
            movie.user.email,
            movie.title,
            movie.releaseDate
          );

          await prisma.movie.update({
            where: { id: movie.id },
            data: { reminderSent: true },
          });

          console.log(`✅ Reminder sent for movie: ${movie.title}`);
        } catch (error) {
          console.error(`❌ Error sending reminder for movie ${movie.title}:`, error);
        }
      }

      console.log('✅ Movie reminder job completed');
    } catch (error) {
      console.error('❌ Error in movie reminder job:', error);
    }
  });

  console.log('📅 Cron job scheduled: Movie reminders will be sent daily at 9:00 AM');
};
