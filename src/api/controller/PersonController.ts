import { type Request, type Response } from 'express'

import type IPersonController from '../interface/IPersonController'
import type IPersonService from '../interface/IPersonService'
import type IPersonValidator from '../interface/IPersonValidator'
import KnownError from '../validator/errors/KnownError'

class PersonController implements IPersonController {
  constructor (readonly personService: IPersonService, readonly personValidator: IPersonValidator) {}

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const errorList = this.personValidator.validateCreation(req.body.name, req.body.email, req.body.age)
    if (errorList.length !== 0) return res.status(400).json({ errorList })
    try {
      const person = await this.personService.create(req.body.name, req.body.email, req.body.age)
      return res.status(201).json(person)
    } catch (error) {
      console.error(error)
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }

      return res.status(500).send({ name: 'Erro desconhecido', message: 'Um erro inesperado aconteceu durante a requisição' })
    }
  }

  async getAll (res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const personList = await this.personService.getAll()
      return res.status(200).json(personList)
    } catch (error) {
      console.error(error)
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }
      return res.status(500).send({ name: 'Erro desconhecido', message: 'Um erro inesperado aconteceu durante a requisição' })
    }
  }

  async get (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const person = await this.personService.get(req.params.id)
      if (person !== null) return res.status(200).send(person)
      else return res.status(404).send({ name: 'Pessoa não encontrada', message: 'Não foi possível encontrar uma pessoa com este ID' })
    } catch (error) {
      console.error(error)
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }
      return res.status(500).send({ name: 'Erro desconhecido', message: 'Um erro inesperado aconteceu durante a requisição' })
    }
  }

  update (req: Request, res: Response): Response<any, Record<string, any>> {
    const errorList = this.personValidator.validateUpdate(req.body.name, req.body.email, req.body.age)
    if (errorList.length !== 0) return res.status(400).json({ errorList })
    try {
      const person = this.personService.update(req.params.id, req.body)
      if (person !== null) return res.status(200).send(person)
      else return res.status(404).send({ name: 'Pessoa não encontrada', message: 'Não foi possível encontrar uma pessoa com este ID' })
    } catch (error) {
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }
      return res.status(500).send({ name: 'Erro desconhecido', message: 'Um erro inesperado aconteceu durante a requisição' })
    }
  }

  delete (req: Request, res: Response): Response<any, Record<string, any>> {
    try {
      const person = this.personService.delete(req.params.id)
      if (person !== null) return res.status(200).send(person)
      else return res.status(404).send({ name: 'Pessoa não encontrada', message: 'Não foi possível encontrar uma pessoa com este ID' })
    } catch (error) {
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }
      return res.status(500).send({ name: 'Erro desconhecido', message: 'Um erro inesperado aconteceu durante a requisição' })
    }
  }
}

export default PersonController
