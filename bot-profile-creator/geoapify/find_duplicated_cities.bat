psql -d paxintrade -U paxintrade -h localhost -c "COPY (SELECT array_agg(DISTINCT city_id) AS city_ids, name FROM city_translations WHERE language = 'original' GROUP BY name HAVING COUNT(DISTINCT city_id) > 1) TO STDOUT" -o duplicated_cities.txt