document.addEventListener('DOMContentLoaded', async () => { // Made async to await API key fetch
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');

    const agentEditTitle = document.getElementById('agent-edit-title');
    const agentNameInput = document.getElementById('agent-name');
    const systemPromptTextarea = document.getElementById('system-prompt');
    const modelNameSelect = document.getElementById('model-name');
    const apiKeyIdSelect = document.getElementById('api-key-id');
    const saveAgentBtn = document.getElementById('save-agent-btn');
    const deleteAgentBtn = document.getElementById('delete-agent-btn');

    // Populate API Key dropdown
    if (window.simulateFetchApiKeys) { // Check if the function from app.js is available
        const apiKeys = await window.simulateFetchApiKeys();
        apiKeyIdSelect.innerHTML = '<option value="">-- 키 선택 --</option>'; // Default option
        apiKeys.forEach(key => {
            const option = document.createElement('option');
            option.value = key.id;
            option.textContent = key.alias;
            apiKeyIdSelect.appendChild(option);
        });
    } else {
        console.warn('simulateFetchApiKeys not found. API Key dropdown will not be populated.');
    }

    // Simulate fetching agent data
    const simulateFetchAgent = (id) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (id === 'agent_world_builder') {
                    resolve({
                        id: 'agent_world_builder',
                        name: '세계관 구축 에이전트',
                        system_prompt: '당신은 사용자가 제공하는 정보를 바탕으로 판타지 세계관의 역사, 지리, 문화, 종족 등을 상세하게 구축하는 전문 에이전트입니다.',
                        model_name: 'gpt-4o',
                        user_api_key_id: 'key_1700000000001' // Example key ID
                    });
                } else if (id === 'agent_plot_generator') {
                    resolve({
                        id: 'agent_plot_generator',
                        name: '플롯 생성 에이전트',
                        system_prompt: '당신은 사용자의 요청에 따라 소설의 플롯을 생성하고, 주요 사건, 갈등, 해결 과정을 상세하게 구성하는 에이전트입니다.',
                        model_name: 'claude-3-sonnet',
                        user_api_key_id: 'key_1700000000002' // Example key ID
                    });
                } else if (id === 'agent_character_analyst') {
                    resolve({
                        id: 'agent_character_analyst',
                        name: '캐릭터 심층 분석 에이전트',
                        system_prompt: '당신은 사용자가 제공하는 인물 정보를 바탕으로 캐릭터의 성격, 배경, 관계를 심층적으로 분석하고 발전시키는 에이전트입니다.',
                        model_name: 'gemini-1.5-pro',
                        user_api_key_id: '' // No specific key for this one
                    });
                } else {
                    resolve(null); // Agent not found
                }
            }, 300);
        });
    };

    // Load agent data if in edit mode
    if (agentId && agentId !== 'new') {
        agentEditTitle.textContent = '에이전트 수정';
        deleteAgentBtn.style.display = 'inline-flex'; // Show delete button

        const agent = await simulateFetchAgent(agentId);
        if (agent) {
            agentNameInput.value = agent.name;
            systemPromptTextarea.value = agent.system_prompt;
            modelNameSelect.value = agent.model_name || '';
            apiKeyIdSelect.value = agent.user_api_key_id || '';
            agentEditTitle.textContent = `에이전트 수정: ${agent.name}`;
        } else {
            alert('에이전트를 찾을 수 없습니다.');
            window.location.href = 'agents.html';
        }
    } else {
        agentEditTitle.textContent = '새 에이전트 생성';
        deleteAgentBtn.style.display = 'none'; // Hide delete button for new agent
    }

    // Handle Save button click
    saveAgentBtn.addEventListener('click', () => {
        const agentName = agentNameInput.value;
        const systemPrompt = systemPromptTextarea.value;
        const modelName = modelNameSelect.value;
        const apiKeyId = apiKeyIdSelect.value;

        if (!agentName || !systemPrompt) {
            alert('에이전트 이름과 시스템 프롬프트를 입력해주세요.');
            return;
        }

        const agentData = {
            name: agentName,
            system_prompt: systemPrompt,
            model_name: modelName,
            user_api_key_id: apiKeyId
        };

        if (agentId === 'new') {
            // Simulate POST /api/agents (Create)
            console.log('Simulating API call: POST /api/agents (Create)', agentData);
            setTimeout(() => {
                alert(`새 에이전트 "${agentName}"이(가) 생성되었습니다.`);
                window.location.href = 'agents.html';
            }, 500);
        } else {
            // Simulate PUT /api/agents/{id} (Update)
            console.log(`Simulating API call: PUT /api/agents/${agentId} (Update)`, agentData);
            setTimeout(() => {
                alert(`에이전트 "${agentName}"이(가) 저장되었습니다.`);
                window.location.href = 'agents.html';
            }, 500);
        }
    });

    // Handle Delete button click
    deleteAgentBtn.addEventListener('click', () => {
        if (confirm(`정말로 에이전트 "${agentNameInput.value}"을(를) 삭제하시겠습니까?`)) {
            // Simulate DELETE /api/agents/{id}
            console.log(`Simulating API call: DELETE /api/agents/${agentId}`);
            setTimeout(() => {
                alert(`에이전트 "${agentNameInput.value}"이(가) 삭제되었습니다.`);
                window.location.href = 'agents.html';
            }, 500);
        }
    });
});
