(ns radify.controllers.radar
  (:require [radify.models.radar :as model]
            [radify.db.couchdb :as db]
            [ring.util.response :as ring]))

(defn- response-wrapper [status data]
  (ring/status (ring/response data) status))

(def ^:private error-saving
  (response-wrapper 400 {:message "Oops, something bad ocurred while trying to save"}))


;; ### site ###
(defn main-page []
  (ring/resource-response "index.html" {:root "public/html"}))

;; ### api ###
(defn api-welcome []
  "<h1>Hello World! This is radify API!</h1>")

(defn get-radar [id]
  (->(if (= id "dummy")
        model/dummy-radar
        (db/load-item id))
      (ring/response)))

(defn save-radar [radar]
  (println radar)
  (let [result (db/save-item radar)]
      (if (nil? result)
          error-saving
          (ring/response result))))
