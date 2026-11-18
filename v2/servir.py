"""Servidor local do protótipo, sem cache (cada recarga pega a versão nova dos arquivos).
Uso: python3 servir.py  →  http://localhost:4190 (e na rede: http://SEU-IP:4190)"""
import http.server, socketserver, os, sys

PORTA = int(sys.argv[1]) if len(sys.argv) > 1 else 4190
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class SemCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('0.0.0.0', PORTA), SemCache) as s:
    print(f'Pulse Creator em http://localhost:{PORTA}')
    s.serve_forever()
