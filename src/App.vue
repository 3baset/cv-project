<script setup lang="ts">
import FileUpload from './components/FileUpload.vue'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">CV Analyzer</div>
      <nav class="nav">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>
    </header>

    <main class="main-content">
      <section class="hero">
        <h1 class="hero-title">Get a Professional CV Analysis in Seconds</h1>
        <p class="hero-subtitle">Upload your CV and receive detailed feedback to optimize it for job applications</p>
        <FileUpload />
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p class="footer-text">Contact: support@cvanalyzer.com</p>
        <div class="social-links">
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
        </div>
        <a href="#" class="privacy-link">Privacy Policy</a>
      </div>
    </footer>
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #2563eb;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-title {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.footer {
  background-color: #f8fafc;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-text {
  color: #64748b;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  text-decoration: none;
  color: #2563eb;
}

.privacy-link {
  text-decoration: none;
  color: #64748b;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .nav {
    gap: 1rem;
  }
}
</style>
