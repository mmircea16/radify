(ns radify.core
  (:require [compojure.core :refer [GET defroutes]]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [org.httpkit.server :as server])
    (:gen-class))

(defroutes app-routes
  (GET "/" [] "<h1>Hello World! This is radify!</h1>")
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (handler/site app-routes))

(defn -main []
  (server/run-server app {:port 8080}))
