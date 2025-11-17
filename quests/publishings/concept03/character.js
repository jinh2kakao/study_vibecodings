// concept03/character.js

// (v1.8) 목업용 인물 상세 데이터 (API 시뮬레이션)
const MOCK_CHARACTER_DB = {
  "char-jin": {
      "name": "진 (Jin)",
      "role": "Protagonist",
      "gender": "여성",
      "age": "24",
      "height": "168cm",
      "appearance": "검은 단발, 녹색 인공 눈, 구형 사이버네틱 팔",
      "personality": "냉소적, 충동적, 의리 있음, 과거의 트라우마...",
      "bio": "몰락한 가문의 마지막 생존자. 신라 기업에 복수하기 위해...",
      "speech": "주로 반말, '흥미롭군.'",
      "relationships": [
          { "target_id": "char-kaiser", "description": "증오하는 라이벌" }
      ]
  },
  "char-kaiser": {
      "name": "카이저 (Kaiser)",
      "role": "Antagonist",
      "gender": "남성",
      "age": "40대",
      "height": "190cm",
      "appearance": "전신을 기계화했다. 붉은색 광학 렌즈.",
      "personality": "냉혹하고 계산적임.",
      "bio": "신라 기업의 보안 총책임자. '진'을 추격한다.",
      "speech": "항상 존댓말을 사용한다.",
      "relationships": []
  }
};


document.addEventListener('DOMContentLoaded', () => {
    // 0. v1.6 '설정' 탭의 '인물' 서브탭이 로드되었는지 확인
    const charactersPane = document.getElementById('characters-pane'); // Corrected from characters-sub-pane to characters-pane
    if (!charactersPane) return; // '인물' 탭이 아니면 실행 안 함

    // 1. 모달 인스턴스 생성
    const choiceModal = new bootstrap.Modal(document.getElementById('characterCreateChoiceModal'));
    const interviewModal = new bootstrap.Modal(document.getElementById('characterAiInterviewModal'));
    const manualFormModal = new bootstrap.Modal(document.getElementById('characterManualFormModal'));

    // 2. 버튼 엘리먼트 선택 및 기타 DOM 요소
    const addCharacterBtn = charactersPane.querySelector('.btn-primary'); // `[+ 새 인물 추가]`
    const openAiInterviewBtn = document.getElementById('openAiInterviewBtn');
    const openManualFormBtn = document.getElementById('openManualFormBtn');
    const manualForm = document.getElementById('character-manual-form');
    const manualFormTitle = document.getElementById('manualFormTitle');
    const relationshipsContainer = document.getElementById('relationships-container'); // Corrected: Moved this definition here
    
    // 3. '선택 모달' 열기 (IA 2.4.1) - 신규 생성
    if (addCharacterBtn) {
        addCharacterBtn.addEventListener('click', () => {
            choiceModal.show();
        });
    }

    // 4. '선택 모달' -> 'AI 인터뷰' 또는 '수동 폼' 열기
    if (openAiInterviewBtn) {
        openAiInterviewBtn.addEventListener('click', () => {
            choiceModal.hide();
            // (IA 2.0) AI 인터뷰 모달 열기
            interviewModal.show();
            initAiInterview();
        });
    }
    if (openManualFormBtn) {
        openManualFormBtn.addEventListener('click', () => {
            choiceModal.hide();
            // (IA 3.0) 수동 폼 모달 열기 (빈 폼)
            manualFormTitle.textContent = "새 인물 생성 (수동 양식)";
            manualForm.reset();
            prefillManualForm({}); // Clear form
            manualFormModal.show();
        });
    }

    // 5. (신규) '편집' 버튼 클릭 시 (IA 3.1)
    charactersPane.addEventListener('click', (e) => {
        // v1.6 목업에서 '편집' 버튼을 식별 (예: '수정' 텍스트를 포함한 버튼)
        if (e.target.classList.contains('btn-outline-secondary') && e.target.textContent.includes('편집')) { // Corrected from '수정' to '편집'
            e.preventDefault();
            
            // (IA 3.1) '선택'이나 'AI 인터뷰'를 *건너뛰고* '수동 폼'을 즉시 엽니다.
            
            // (IA 3.1.5) API 호출 시뮬레이션 및 폼 자동 채우기
            // 실제로는 카드에서 char-id를 가져와 API를 가져와야 함.
            // 여기서는 '진'의 데이터(MOCK_CHARACTER_DB)로 시뮬레이션합니다.
            prefillManualForm(MOCK_CHARACTER_DB['char-jin'], "인물 편집 (진)");
            manualFormModal.show();
        }
    });


    // 6. (IA 2.0) 'AI 인터뷰' 시뮬레이션 로직
    const chatWindow = document.getElementById('ai-chat-window');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSendBtn = document.getElementById('ai-chat-send-btn');
    let interviewStep = 0; // Start from 0 to match array index
    let collectedAiData = {}; // To store data collected during AI interview

    const aiInterviewPrompts = [
        {
            ai: "만나서 반갑습니다. 당신의 소설에 등장할 새 인물에 대해 이야기해 볼까요? 우선, 이 인물의 <b>이름</b>과 소설에서 맡은 <b>역할</b>(예: 주인공, 악당)을 알려주시겠어요?",
            field: ['name', 'role'],
            process: (input) => {
                const parts = input.split(',').map(s => s.trim());
                collectedAiData.name = parts[0] || '';
                collectedAiData.role = parts[1] || 'Protagonist';
                return `알겠습니다. ${collectedAiData.name} (${collectedAiData.role})이군요. 이제 이 인물의 <b>외모</b>에 대해 자세히 알려주시겠어요? (예: 키, 체형, 머리색, 눈색, 특징적인 복장 등)`;
            }
        },
        {
            ai: "좋습니다. 이제 이 인물의 <b>성격</b>은 어떤가요? (예: 용감한, 소심한, 냉철한, 유머러스한 등)",
            field: 'appearance',
            process: (input) => {
                collectedAiData.appearance = input;
                return `흥미롭네요. ${collectedAiData.name}의 <b>성격</b>은 어떤가요? (예: 용감한, 소심한, 냉철한, 유머러스한 등)`;
            }
        },
        {
            ai: "알겠습니다. 마지막으로, 이 인물의 <b>배경 설정</b>이나 <b>특징적인 말투</b>가 있다면 알려주세요. (예: 고아 출신, 마법사 가문, ~했지 말입니다 등)",
            field: 'personality',
            process: (input) => {
                collectedAiData.personality = input;
                return `알겠습니다. 마지막으로, 이 인물의 <b>배경 설정</b>이나 <b>특징적인 말투</b>가 있다면 알려주세요. (예: 고아 출신, 마법사 가문, ~했지 말입니다 등)`;
            }
        },
        {
            ai: "훌륭합니다! 인터뷰가 완료되었습니다. 수집된 정보를 바탕으로 상세 양식을 미리 채워드릴게요. 필요하다면 수정해주세요.",
            field: ['bio', 'speech'],
            process: (input) => {
                const parts = input.split(',').map(s => s.trim());
                collectedAiData.bio = parts[0] || '';
                collectedAiData.speech = parts[1] || '';
                return "훌륭합니다! 인터뷰가 완료되었습니다. 수집된 정보를 바탕으로 상세 양식을 미리 채워드릴게요. 필요하다면 수정해주세요.";
            }
        }
    ];

    function initAiInterview() {
        chatWindow.innerHTML = `
            <div class="chat-message ai" data-step="0">
                ${aiInterviewPrompts[0].ai}
            </div>
        `;
        chatInput.value = "";
        interviewStep = 0;
        collectedAiData = {};
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
    }

    chatSendBtn.addEventListener('click', () => {
        const userInput = chatInput.value.trim();
        if (userInput === "") return;

        // Display user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = userInput;
        chatWindow.appendChild(userMsg);
        chatInput.value = "";
        chatInput.disabled = true;
        chatSendBtn.disabled = true;

        setTimeout(() => {
            if (interviewStep < aiInterviewPrompts.length) {
                const currentPrompt = aiInterviewPrompts[interviewStep];
                currentPrompt.process(userInput); // Process user input for current step

                
                if (interviewStep < aiInterviewPrompts.length -1) { // Check if there's a next AI prompt to display
                    interviewStep++; // Move to next step
                    const nextPrompt = aiInterviewPrompts[interviewStep];
                    const aiMsg = document.createElement('div');
                    aiMsg.className = 'chat-message ai';
                    aiMsg.dataset.step = interviewStep;
                    aiMsg.innerHTML = nextPrompt.ai; // Display next AI prompt
                    chatWindow.appendChild(aiMsg);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                    chatInput.disabled = false;
                    chatSendBtn.disabled = false;
                } else {
                    // Interview finished - it's the last prompt, so display final message and open manual form
                    const finalAiMsg = document.createElement('div');
                    finalAiMsg.className = 'chat-message ai';
                    finalAiMsg.innerHTML = aiInterviewPrompts[aiInterviewPrompts.length - 1].ai; // Display last AI prompt
                    chatWindow.appendChild(finalAiMsg);
                    chatWindow.scrollTop = chatWindow.scrollHeight;

                    setTimeout(() => {
                        interviewModal.hide();
                        prefillManualForm(collectedAiData, "AI 생성 인물 확인");
                        manualFormModal.show();
                    }, 1000);
                }
            } else { // This block handles if interviewStep is already >= aiInterviewPrompts.length at the start of the click
                // This means the interview was technically finished, just waiting for the last AI response.
                 setTimeout(() => {
                    interviewModal.hide();
                    prefillManualForm(collectedAiData, "AI 생성 인물 확인");
                    manualFormModal.show();
                }, 1000);
            }
        }, 1000);
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !chatSendBtn.disabled) {
            chatSendBtn.click();
        }
    });

    // 7. (IA 2.0.10 & 3.1.5) 폼을 데이터로 채우는 공통 함수
    function prefillManualForm(data, title) {
        manualFormTitle.textContent = title;
        manualForm.reset();
        
        if (!data) return;

        // v1.8 스키마에 따라 폼 필드 채우기
        manualForm.elements['name'].value = data.name || "";
        manualForm.elements['role'].value = data.role || "Protagonist";
        manualForm.elements['gender'].value = data.gender || "";
        manualForm.elements['age'].value = data.age || "";
        manualForm.elements['height'].value = data.height || "";
        manualForm.elements['appearance'].value = data.appearance || "";
        manualForm.elements['personality'].value = data.personality || "";
        manualForm.elements['bio'].value = data.bio || "";
        manualForm.elements['speech'].value = data.speech || "";
        
        // (v1.8) 연결 인물 폼 채우기 (시뮬레이션)
        relationshipsContainer.innerHTML = ''; // Clear existing relationships
        if (data.relationships && data.relationships.length > 0) {
            data.relationships.forEach(rel => {
                const newRelationshipDiv = document.createElement('div');
                newRelationshipDiv.classList.add('input-group', 'mb-2');
                newRelationshipDiv.innerHTML = `
                    <select class="form-select" style="flex-grow: 2;">
                        <option>${rel.target_id}</option>
                    </select>
                    <input type="text" class="form-control" style="flex-grow: 3;" value="${rel.description}">
                    <button class="btn btn-outline-danger" type="button">X</button>
                `;
                relationshipsContainer.appendChild(newRelationshipDiv);
                newRelationshipDiv.querySelector('.btn-outline-danger').addEventListener('click', (e) => {
                    e.target.closest('.input-group').remove();
                });
            });
        }
    }

    // 8. (IA 3.0) 수동 폼 저장
    document.getElementById('save-character-btn').addEventListener('click', () => {
        const title = manualFormTitle.textContent;
        if (title.includes("편집")) {
            alert("인물 정보가 [수정]되었습니다! (PUT API 호출 시뮬레이션)");
        } else {
            alert("새 인물이 [저장]되었습니다! (POST API 호출 시뮬레이션)");
        }
        manualFormModal.hide();
        // (실제로는 여기서 '인물' 탭 카드 그리드를 갱신해야 함)
    });

    // Add Relationship button for manual form
    const addRelationshipBtn = document.getElementById('add-relationship-btn');
    if (addRelationshipBtn) {
        addRelationshipBtn.addEventListener('click', () => {
            const newRelationshipDiv = document.createElement('div');
            newRelationshipDiv.classList.add('input-group', 'mb-2');
            newRelationshipDiv.innerHTML = `
                <select class="form-select" style="flex-grow: 2;">
                    <option>새 인물 (역할)</option>
                    <option>엘라라 (주인공)</option>
                    <option>카이로스 (조력자)</option>
                    <option>제이든 (악당)</option>
                </select>
                <input type="text" class="form-control" style="flex-grow: 3;" placeholder="관계 설명">
                <button class="btn btn-outline-danger" type="button">X</button>
            `;
            relationshipsContainer.appendChild(newRelationshipDiv);

            // Add event listener to the new remove button
            newRelationshipDiv.querySelector('.btn-outline-danger').addEventListener('click', (e) => {
                e.target.closest('.input-group').remove();
            });
        });
    }
});