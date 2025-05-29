const Task = require('../../../models/Task')

const mongoose = require('mongoose')

describe('Task model - Unit Test', () => {
  let sut

  beforeEach(() => {
    sut = new Task()
  })

  test('should create a task with correct fields', () => {
    sut.name = 'Estudar Clean Architecture'

    expect(sut.name).toBe('Estudar Clean Architecture')
    expect(sut.status).toBe('pendente')
    expect(sut.created_at).toBeInstanceOf(Date)
  })
  test('should throw validation error if name is missing', async () => {
    try {
      await sut.validate()
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.errors.name).toBeDefined()
      expect(error.errors.name.kind).toBe('required')
    }
  })
  test('Should change status if provided', async () => {
    sut.name = 'Estudar Clean Architecture'
    sut.status = 'concluido'

    expect(sut.status).toBe('concluido')
  })
})
