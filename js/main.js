
document.addEventListener('DOMContentLoaded', () => {
    const profileData = JSON.parse(document.getElementById('profile-data').textContent);

    // Header
    const header = document.createElement('header');
    header.innerHTML = `
        <img src="${profileData.header.profilePicUrl}" alt="${profileData.header.name}">
        <h1>${profileData.header.name}</h1>
        <p>${profileData.header.title}</p>
        <a href="${profileData.header.cvUrl}" class="download-cv" download>Download CV</a>
    `;

    // Navigation
    const nav = document.createElement('nav');
    profileData.navigation.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        nav.appendChild(a);
    });

    // About Section
    const aboutSection = document.createElement('section');
    aboutSection.id = 'about';
    aboutSection.className = 'about';
    aboutSection.innerHTML = `
        <h2>About Me</h2>
        <p>${profileData.about.text}</p>
    `;

    // Skills Section
    const skillsSection = document.createElement('section');
    skillsSection.id = 'skills';
    skillsSection.className = 'skills';
    skillsSection.innerHTML = '<h2>Skills</h2>';

    profileData.skills.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        categoryDiv.innerHTML = `<h3>${category.category}</h3><ul></ul>`;

        category.skills.forEach(skill => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-bar"><div style="width: ${skill.level};"></div></div>
            `;
            categoryDiv.querySelector('ul').appendChild(li);
        });

        skillsSection.appendChild(categoryDiv);
    });

    // Experience Section
    const experienceSection = document.createElement('section');
    experienceSection.id = 'experience';
    experienceSection.className = 'experience';
    experienceSection.innerHTML = '<h2>Experience</h2>';

    profileData.experience.forEach(job => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.timePeriod}</p>
            <p>${job.description}</p>
        `;
        experienceSection.appendChild(article);
    });

    // Certifications Section
    const certificationsSection = document.createElement('section');
    certificationsSection.id = 'certifications';
    certificationsSection.className = 'certifications';
    certificationsSection.innerHTML = '<h2>Certifications</h2><ul></ul>';

    profileData.certifications.forEach(cert => {
        const li = document.createElement('li');
        li.textContent = `${cert.name} - ${cert.issuer}`;
        certificationsSection.querySelector('ul').appendChild(li);
    });

    // Contact Section
    const contactSection = document.createElement('section');
    contactSection.id = 'contact';
    contactSection.className = 'contact';
    contactSection.innerHTML = `
        <h2>Contact</h2>
        <form id="contact-form">
        <textarea name="message" id="mail_message" placeholder="${profileData.contact.placeholderMessage}"></textarea>
        <button type="button" onclick="sendEmail()">${profileData.contact.buttonText}</button>
    </form>
    `;

    // Socials Section
    const socialsSection = document.createElement('section');
    socialsSection.id = 'socials';
    socialsSection.className = 'socials';
    socialsSection.innerHTML = '<h2>Find Me On</h2>';

    profileData.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.target = '_blank';
        a.title = social.platform;

        const img = document.createElement('img');
        img.src = social.icon;
        img.alt = social.platform;

        a.appendChild(img);
        socialsSection.appendChild(a);
    });

    // Footer
    const footer = document.createElement('footer');
    footer.innerHTML = `<p>© 2024 ${profileData.header.name}. All rights reserved.</p>`;

    // Append all sections to container
    const container = document.getElementById('profile-container');
    container.appendChild(header);
    container.appendChild(nav);
    container.appendChild(aboutSection);
    container.appendChild(experienceSection);
    container.appendChild(certificationsSection);
    container.appendChild(skillsSection);
    container.appendChild(contactSection);
    container.appendChild(socialsSection);
    container.appendChild(footer);

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Toggle Skill Categories
    document.querySelectorAll('.skill-category h3').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('active');
        });
    });
});


function sendEmail() {
    console.log("Called SendEmail");
    // Get form field values
    const message = document.getElementById('mail_message').value;

    // Construct the mailto URL
    const subject = `Reaching out via portfolio website`;
    const body = `Message:%0D%0A${encodeURIComponent(message)}`;

    // Open the user's default email client
    window.location.href = `mailto:hi@jafarisharib.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}