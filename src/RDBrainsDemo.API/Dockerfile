FROM microsoft/aspnet

ADD . /app

WORKDIR /app/approot

# Expose container port
ENV PORT=5001
EXPOSE $PORT

ENTRYPOINT ["./web"]