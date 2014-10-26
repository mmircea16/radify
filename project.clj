(defproject radify "0.1.0-SNAPSHOT"
  :description "radify"
  :url ""

  :dependencies [[org.clojure/clojure "1.6.0"]

                 [prismatic/schema "0.3.0"]
                 [compojure "1.1.9"] ;; for routing
                 [ring "1.3.1"]
                 [ring/ring-json "0.2.0"] ;; for serializing
                 [http-kit "2.1.19"]
                 [com.ashafa/clutch "0.4.0"]] ;; CouchDB wrapper love :D

  :min-lein-version "2.0.0"

  :source-paths ["src/clj"]
  :resource-paths ["resources"]

  :main ^:skip-aot radify.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}}
             :dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]]})
