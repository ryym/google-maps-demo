import request from 'superagent';

function findById(id) {
  return toPromise(
    request.get(`/buildings/${id}`)
  );
}

function listAll() {
  return toPromise(
    request.get('/buildings')
  );
}

function listNeighborsOf(id, radius) {
  return toPromise(
    request
      .get(`/buildings/${id}/neighbors`)
      .query({ radius })
  );
}

function toPromise(agent) {
  return new Promise((resolve, reject) => {
      agent.end((err, res) => {
        if (err) {
          reject(err, res);
        } else {
          resolve(res.body);
        }
      });
    }
  );
}

export default {
  findById,
  listAll,
  listNeighborsOf,
};
