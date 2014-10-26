(defproject radify "0.1.0-SNAPSHOT"
  :description "radify"
  :url ""

  :dependencies [[org.clojure/clojure "1.6.0"]

                 [prismatic/schema "0.3.0"]
                 [compojure "1.1.9"] ;; for routing
                 [ring "1.3.1"]
                 [ring/ring-json "0.2.0"] ;; for serializing
                 [http-kit "2.1.19"]
                 [com.ashafa/clutch "0.4.0"]
                 
                 [com.cemerick/friend "0.2.0-SNAPSHOT"]

                 ;; only used for the oauth-related demos
                 [friend-oauth2 "0.0.3"]
                 
                 ;; only used to generate demo app pages
                 [hiccup "1.0.1"]
                 
                 ;; only used to discover demo app namespaces
                 [bultitude "0.1.7"]
                 
                 ;; only used for foundation js/css
                 [org.webjars/foundation "4.0.4"]] ;; CouchDB wrapper love :D

  :min-lein-version "2.0.0"

  :source-paths ["src/clj"]
  :resource-paths ["resources"]

  :main ^:skip-aot radify.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}}
             :dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]]})
