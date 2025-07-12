document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.quiz-btn');
            if (button) {
                const item = button.closest('.quiz-item');
                const explanation = item.querySelector('.quiz-explanation');
                
                item.querySelectorAll('.quiz-btn').forEach(btn => btn.classList.remove('ring-2', 'ring-offset-2', 'ring-green-500', 'ring-red-500'));
                
                explanation.classList.remove('hidden');
                if (button.dataset.answer === 'O') {
                   explanation.classList.remove('text-red-600');
                   explanation.classList.add('text-green-600');
                   button.classList.add('ring-2', 'ring-offset-2', 'ring-green-500');
                } else {
                   explanation.classList.remove('text-green-600');
                   explanation.classList.add('text-red-600');
                   button.classList.add('ring-2', 'ring-offset-2', 'ring-red-500');
                }
            }
        });
    }

    const pledgeList = document.getElementById('pledge-list');
    if(pledgeList) {
        pledgeList.addEventListener('click', (e) => {
            const item = e.target.closest('.pledge-item');
            if(item) {
                const icon = item.querySelector('.check-icon');
                item.classList.toggle('bg-teal-100');
                icon.classList.toggle('bg-teal-500');
                icon.classList.toggle('border-teal-500');
                icon.innerHTML = icon.classList.contains('bg-teal-500') ? '<span class="text-white font-bold text-sm">✔</span>' : '';
            }
        });
    }

    const ctx = document.getElementById('progressChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['1단계: 개념 알기', '2단계: 법과 규칙', '3단계: 실천하기'],
                datasets: [{
                    label: '학습 단계',
                    data: [33, 33, 34],
                    backgroundColor: ['#5EEAD4', '#FCD34D', '#7DD3FC'],
                    borderColor: ['#14B8A6', '#F59E0B', '#0EA5E9'],
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                family: "'Noto Sans KR', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(tooltipItems) {
                                const item = tooltipItems[0];
                                let label = item.chart.data.labels[item.dataIndex];
                                if (Array.isArray(label)) {
                                  return label.join(' ');
                                } else {
                                  return label;
                                }
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    const sections = document.querySelectorAll('main > div[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });
    sections.forEach(section => observer.observe(section));
});