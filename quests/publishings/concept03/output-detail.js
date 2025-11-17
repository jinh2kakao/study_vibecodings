const MOCK_ARTIFACT_DB = {
    "chapter-1": {
        title: "챕터 1: 새로운 시작",
        type: "소설",
        date: "2025-11-17 16:10",
        content: `
            <h2 class="mb-4">챕터 1: 새로운 시작</h2>
            <hr>
            <p>
                <strong>[메타::POV]</strong> 엘라라<br>
                <strong>[메타::시간]</strong> 밤, 숲 속<br>
                <strong>[메타::장소]</strong> 잊혀진 고대 유적 입구
            </p>
            <p>
                어둠이 짙게 깔린 숲 속, 엘라라는 낡은 망토를 더욱 단단히 여몄다. 차가운 밤공기가 폐부 깊숙이 스며들었지만, 그녀의 눈은 흔들림 없이 전방의 고대 유적 입구를 응시하고 있었다. 
                수십 년간 봉인되어 누구도 범접할 수 없었던 곳. 그러나 오늘 밤, 그녀는 그 금기를  깨려 하고 있었다.
            </p>
            <h3>1.1. 잊혀진 유산</h3>
            <p>
                유적의 거대한 돌문은 이끼로 뒤덮여 있었고, 문양은 세월의 풍파 속에 희미해져 있었다. 
                엘라라는 손가락으로 거친 표면을 쓸어내렸다. 
                이곳에 그녀의 가문이 수 세기 동안 지켜온 비밀, 즉 멸망한 왕국의 마지막 희망이 잠들어 있었다. 
                그녀의 심장이 격렬하게 고동쳤다. 두려움보다는 결의에 찬 떨림이었다.
            </p>
            <h3>1.2. 그림자 속의 속삭임</h3>
            <p>
                문득, 숲 속 깊은 곳에서 섬뜩한 속삭임이 들려왔다. 
                엘라라는 재빨리 몸을 숨겼다. 
                그것은 인간의 목소리가 아니었다. 
                어둠 속에서 형체를 알 수 없는 그림자들이 스멀스멀 기어 나오는 것을 느꼈다. 
                신라 기업의 추격대였다. 
                그들은 엘라라의 뒤를 끈질기게 쫓고 있었다.
            </p>
            <p>
                <strong>[메타::갈등]</strong> 엘라라 vs 신라 기업 추격대<br>
                <strong>[메타::감정]</strong> 긴장, 위기감
            </p>
            <p>
                엘라라는 숨을 죽였다. 
                그녀는 이곳에서 붙잡힐 수는 없었다. 
                가문의 유산을 되찾고, 신라 기업에 복수하기 위해서는 반드시 이 문을 열어야만 했다. 
                그녀의 손이 허리춤의 단검으로 향했다. 
                이제 더 이상 물러설 곳은 없었다.
            </p>
            <hr>
            <p class="text-muted small text-end">생성 일시: 2025년 11월 17일 16:10</p>
        `,
        context: {
            jobInfo: {
                id: "JOB-20251117-001",
                time: "1분 32초",
                status: "✅ 완료"
            },
            prompt: `"몰락한 왕국의 마지막 공주 엘라라가 가문의 유산을 되찾기 위해 금지된 고대 유적에 침입하는 챕터 1을 작성해줘. 
                    신라 기업의 추격대가 그녀를 쫓는 긴박한 상황을 포함하고, 엘라라의 결의를 강조해줘. 
                    마크다운 형식으로 작성하고, 각 주요 장면마다 [메타::POV], [메타::시간], [메타::장소], [메타::갈등], [메타::감정] 태그를 삽입해줘."`,
            agents: ["플롯 생성기 (v1.2)", "챕터 집필가 (v1.5)"],
            aiModel: {
                model: "Gemini 1.5 Pro",
                temperature: "0.8"
            }
        }
    },
    "plot-overview": {
        title: "플롯 개요",
        type: "플롯",
        date: "2025-11-17 16:05",
        content: `
            <h2 class="mb-4">플롯 개요</h2>
            <hr>
            <h3>발단</h3>
            <p>
                몰락한 왕국의 마지막 공주 엘라라, 신라 기업에 의해 가족을 잃고 복수를 다짐한다. 
                고대 유적에 숨겨진 가문의 유산을 찾아 힘을 얻으려 한다.
            </p>
            <h3>전개</h3>
            <p>
                유적 탐사 중 신라 기업의 추격대와 조우, 위기를 넘기며 유산의 일부를 발견한다. 
                유산의 힘을 제어하는 방법을 배우기 위해 은둔한 현자를 찾아 나선다.
            </p>
            <h3>위기</h3>
            <p>
                현자를 만난 후 수련 중, 신라 기업의 간부 카이저가 현자의 거처를 습격한다. 
                엘라라는 현자를 지키기 위해 미숙한 힘으로 맞서 싸우지만 역부족이다.
            </p>
            <h3>절정</h3>
            <p>
                현자의 희생으로 엘라라는 유산의 진정한 힘을 각성하고 카이저를 물리친다. 
                하지만 현자의 죽음으로 인해 복수심이 더욱 불타오른다.
            </p>
            <h3>결말</h3>
            <p>
                각성한 힘으로 신라 기업의 본거지에 침투, 최종 보스와 대결한다. 
                복수를 이루지만, 그 과정에서 새로운 깨달음을 얻고 왕국의 재건을 다짐한다.
            </p>
            <hr>
            <p class="text-muted small text-end">생성 일시: 2025년 11월 17일 16:05</p>
        `,
        context: {
            jobInfo: {
                id: "JOB-20251117-002",
                time: "45초",
                status: "✅ 완료"
            },
            prompt: `"엘라라 공주의 복수극을 중심으로 한 판타지 소설의 전체 플롯을 기승전결에 맞춰 상세하게 작성해줘."`,
            agents: ["플롯 생성기 (v1.2)"],
            aiModel: {
                model: "Gemini 1.5 Pro",
                temperature: "0.7"
            }
        }
    },
    "elara-character": {
        title: "주인공 '엘라라' 설정",
        type: "인물",
        date: "2025-11-17 15:50",
        content: `
            <h2 class="mb-4">주인공 '엘라라' 설정</h2>
            <hr>
            <h3>기본 정보</h3>
            <ul>
                <li><strong>이름:</strong> 엘라라 (Elara)</li>
                <li><strong>성별:</strong> 여성</li>
                <li><strong>나이:</strong> 20세</li>
                <li><strong>역할:</strong> 몰락한 왕국의 마지막 공주, 복수를 꿈꾸는 전사</li>
            </ul>
            <h3>외모</h3>
            <p>
                은빛 머리카락과 푸른 눈동자. 가문의 문장이 새겨진 낡은 목걸이를 항상 착용한다. 
                전투로 단련된 날렵한 체형.
            </p>
            <h3>성격</h3>
            <p>
                강인하고 결단력 있으며, 목표를 위해서는 수단과 방법을 가리지 않는다. 
                내면에는 상실감과 외로움을 간직하고 있지만 겉으로는 드러내지 않는다. 
                동료들에게는 깊은 신뢰와 애정을 보인다.
            </p>
            <h3>배경</h3>
            <p>
                어린 시절 신라 기업의 침략으로 왕국이 멸망하고 가족을 모두 잃었다. 
                유일하게 살아남아 복수를 위해 검술과 고대 마법을 익혔다. 
                가문의 마지막 유산이 숨겨진 고대 유적을 찾아 헤매고 있다.
            </p>
            <h3>특징적인 말투</h3>
            <p>
                "후회는 없어. 내가 선택한 길이니까."
            </p>
            <hr>
            <p class="text-muted small text-end">생성 일시: 2025년 11월 17일 15:50</p>
        `,
        context: {
            jobInfo: {
                id: "JOB-20251117-003",
                time: "30초",
                status: "✅ 완료"
            },
            prompt: `"몰락한 왕국의 마지막 공주이자 복수를 꿈꾸는 주인공 '엘라라'의 상세한 캐릭터 설정을 작성해줘. 
                    외모, 성격, 배경, 특징적인 말투를 포함하고 마크다운 형식으로 정리해줘."`,
            agents: ["캐릭터 심층 분석가 (Pro)"],
            aiModel: {
                model: "Gemini 1.5 Pro",
                temperature: "0.6"
            }
        }
    },
    "world-overview": {
        title: "세계관 요약",
        type: "세계관",
        date: "2025-11-17 15:30",
        content: `
            <h2 class="mb-4">세계관 요약</h2>
            <hr>
            <h3>세계의 이름</h3>
            <p>
                아르카디아 (Arcadia)
            </p>
            <h3>주요 세력</h3>
            <ul>
                <li><strong>신라 기업:</strong> 과학 기술을 기반으로 세계를 지배하려는 거대 기업. 마법을 미신으로 치부하고 탄압한다.</li>
                <li><strong>고대 왕국 연합 (멸망):</strong> 마법과 자연의 조화를 중시했으나 신라 기업에 의해 멸망.</li>
                <li><strong>저항 세력:</strong> 멸망한 왕국의 잔존 세력과 마법사들로 이루어진 비밀 조직.</li>
            </ul>
            <h3>마법 시스템</h3>
            <p>
                고대 마법은 자연의 정령과 교감하여 힘을 빌리는 방식. 
                현대에는 거의 잊혀졌으며, 신라 기업은 마법 사용자를 '이단'으로 규정하고 처벌한다.
            </p>
            <h3>주요 기술</h3>
            <p>
                신라 기업은 증기기관, 전자기술, 초기 단계의 인공지능 기술을 보유하고 있다. 
                특히 '강화 병사'와 '자동화 병기'를 통해 강력한 군사력을 유지한다.
            </p>
            <hr>
            <p class="text-muted small text-end">생성 일시: 2025년 11월 17일 15:30</p>
        `,
        context: {
            jobInfo: {
                id: "JOB-20251117-004",
                time: "50초",
                status: "✅ 완료"
            },
            prompt: `"마법과 과학 기술이 공존하는 디스토피아적 판타지 세계관을 상세하게 설정해줘. 
                    주요 세력, 마법 시스템, 주요 기술을 포함하고 마크다운 형식으로 정리해줘."`,
            agents: ["세계관 설정 도우미 (Basic)"],
            aiModel: {
                model: "Gemini 1.5 Pro",
                temperature: "0.7"
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const artifactList = document.querySelector('.artifact-list');
    const outputContent = document.querySelector('.output-content');
    const outputContext = document.querySelector('.output-context');

    // Function to render artifact details
    function renderArtifact(artifactKey) {
        const artifact = MOCK_ARTIFACT_DB[artifactKey];
        if (!artifact) return;

        // Update central content viewer
        outputContent.innerHTML = artifact.content;

        // Update right-hand context panel
        outputContext.innerHTML = `
            <h5 class="mb-3"><i class="bi bi-info-circle-fill me-2"></i>생성 컨텍스트</h5>
            <div class="context-panel">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">작업 정보</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>작업 ID:</span>
                                <span class="fw-bold">${artifact.context.jobInfo.id}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>실행 시간:</span>
                                <span class="fw-bold">${artifact.context.jobInfo.time}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>상태:</span>
                                <span class="badge bg-success">${artifact.context.jobInfo.status}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">입력 프롬프트</h6>
                        <p class="card-text small text-muted">${artifact.context.prompt}</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">사용 에이전트</h6>
                        <ul class="list-group list-group-flush">
                            ${artifact.context.agents.map(agent => `<li class="list-group-item">${agent}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">AI 모델 설정</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>모델:</span>
                                <span class="fw-bold">${artifact.context.aiModel.model}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span>창의성 (Temperature):</span>
                                <span class="fw-bold">${artifact.context.aiModel.temperature}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // Event listener for artifact list clicks
    artifactList.addEventListener('click', (e) => {
        const target = e.target.closest('.list-group-item-action');
        if (!target) return;

        // Remove active class from all items
        artifactList.querySelectorAll('.list-group-item-action').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        target.classList.add('active');

        // Get artifact key (assuming it's stored in a data attribute or can be derived)
        // For now, let's use the text content of the title as a key for mock data
        const artifactTitle = target.querySelector('h6').textContent.trim();
        let artifactKey;
        switch (artifactTitle) {
            case "챕터 1: 새로운 시작":
                artifactKey = "chapter-1";
                break;
            case "플롯 개요":
                artifactKey = "plot-overview";
                break;
            case "주인공 '엘라라' 설정":
                artifactKey = "elara-character";
                break;
            case "세계관 요약":
                artifactKey = "world-overview";
                break;
            default:
                artifactKey = "chapter-1"; // Default to chapter-1
        }
        renderArtifact(artifactKey);
    });

    // Initial render of the first artifact
    renderArtifact("chapter-1");
});