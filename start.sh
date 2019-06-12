uname=$(uname -s)
if [ $uname == "Darwin" ]; then
        # Mac OSX
    cd backend/
    docker build -t express-server .
    docker run -d --name app-server -p 3001:3001 express-server
    cd ../client/
    docker build -t app-frontend .
    docker run -d --link app-server:server --name task-app -p 3000:3000 app-frontend
# elif [ $uname == "Linux" ]; then
#         # ...
#         echo 
# elif [ "$OSTYPE" == "cygwin" ]; then
#         # POSIX compatibility layer and Linux environment emulation for Windows
# elif [ "$OSTYPE" == "msys" ]; then
#         # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
# elif [ "$OSTYPE" == "win32" ]; then
#         # Windows.
#         # ...
# else
#         # Unknown.
fi
