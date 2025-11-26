{ pkgs, ... }: {
  # Antigravity(IDX) 환경 설정
  channel = "stable-23.11";
  packages = [ pkgs.python3 ]; # 파이썬이 필요하므로 명시

  idx = {
    extensions = [
      "ms-vscode.live-server" # 라이브 서버 확장 추천
    ];
    
    # [핵심] 프리뷰 설정
    previews = {
      enable = true;
      previews = {
        web = {
          # 서버 실행 명령어: 우리가 썼던 그 명령어를 여기에 등록합니다.
          # $PORT 변수는 시스템이 자동으로 할당하거나 지정한 포트를 사용합니다.
          command = ["python3" "-m" "http.server" "$PORT" "--directory" "docs/vibecodings/02_publishings_createsite"];
          
          manager = "web";
          
          # 환경 변수 설정 (포트 8080 강제 지정)
          env = {
            PORT = "8080";
          };
        };
      };
    };
  };
}