FROM postgres:15-alpine

# Ajusta UID do usuário postgres para alinhar com host (quando necessário) e corrige permissões.
RUN usermod -u 1000 postgres \
	&& chown -R postgres:postgres /var/lib/postgresql /var/run/postgresql || true

# Evita problemas de locale (opcional) e garante diretório de dados existente antes do volume ser montado.
RUN mkdir -p /var/lib/postgresql/data \
	&& chown -R postgres:postgres /var/lib/postgresql

USER postgres
