// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add animation to tip cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        observer.observe(card);
    });
});

// Savings calculator function
function calculateSavings() {
    // Get input values
    const monthlySavings = parseFloat(document.getElementById('monthly-savings').value);
    const years = parseInt(document.getElementById('years').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    
    // Validate inputs
    if (isNaN(monthlySavings) || monthlySavings <= 0) {
        showResult('Prosim vnesi veljavno vrednost mesečnih prihrankov.', 'error');
        return;
    }
    
    if (isNaN(years) || years <= 0) {
        showResult('Prosim vnesi veljavno število let.', 'error');
        return;
    }
    
    if (isNaN(interestRate) || interestRate < 0) {
        showResult('Prosim vnesi veljavno obrestno mero.', 'error');
        return;
    }
    
    // Calculate compound interest
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    
    let futureValue;
    if (monthlyRate === 0) {
        // Simple calculation without interest
        futureValue = monthlySavings * months;
    } else {
        // Future value of annuity formula
        futureValue = monthlySavings * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    }
    
    const totalContributions = monthlySavings * months;
    const totalInterest = futureValue - totalContributions;
    
    // Format the result
    const resultHTML = `
        <div style="text-align: left;">
            <p style="margin: 0.5rem 0;"><strong>Tvoji prihranki čez ${years} let:</strong></p>
            <p style="font-size: 1.5rem; color: #27ae60; margin: 1rem 0;">
                €${formatNumber(futureValue.toFixed(2))}
            </p>
            <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">
            <p style="margin: 0.5rem 0;">
                Skupni vložki: <strong>€${formatNumber(totalContributions.toFixed(2))}</strong>
            </p>
            <p style="margin: 0.5rem 0;">
                Pridobljene obresti: <strong style="color: #27ae60;">€${formatNumber(totalInterest.toFixed(2))}</strong>
            </p>
        </div>
    `;
    
    showResult(resultHTML, 'success');
}

// Helper function to format numbers with thousands separator
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Show result with animation
function showResult(message, type = 'success') {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = 'result show';
    
    if (type === 'error') {
        resultDiv.style.backgroundColor = '#fadbd8';
        resultDiv.style.color = '#c0392b';
    } else {
        resultDiv.style.backgroundColor = '#ecf0f1';
        resultDiv.style.color = '#2c3e50';
    }
}

// Add enter key support for calculator inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.calculator-input input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateSavings();
            }
        });
    });
});

// Add a simple console message
console.log('💰 Dobrodošli pri Juretovih Finančnih Nasvetih!');
console.log('Spletna stran je pripravljena za uporabo.');
