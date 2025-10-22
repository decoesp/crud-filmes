import { prisma } from './config/database';
import { EmailService } from './services/email.service';
import 'dotenv/config';

async function testEmailReminder() {
  const emailService = new EmailService();
  
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
    
    console.log(`📋 Encontrados ${movies.length} filmes para enviar lembrete`);
    
    if (movies.length === 0) {
      console.log('⚠️  Nenhum filme encontrado com data de hoje.');
      console.log('💡 Crie um filme com data de lançamento = HOJE para testar.');
      return;
    }
    
    for (const movie of movies) {
      console.log(`\n📧 Enviando e-mail para: ${movie.user.email}`);
      console.log(`🎬 Filme: ${movie.title}`);
      console.log(`📅 Data: ${movie.releaseDate.toLocaleDateString('pt-BR')}`);
      
      await emailService.sendMovieReminderEmail(
        movie.user.email,
        movie.title,
        movie.releaseDate
      );
      
      await prisma.movie.update({
        where: { id: movie.id },
        data: { reminderSent: true },
      });
      
      console.log('✅ E-mail enviado com sucesso!');
      console.log('🔗 Acesse https://ethereal.email/messages para visualizar\n');
    }
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testEmailReminder();
